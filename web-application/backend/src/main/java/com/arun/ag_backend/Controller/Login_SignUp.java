package com.arun.ag_backend.Controller;

import com.arun.ag_backend.Dto.Helper;
import com.arun.ag_backend.Dto.StudentDto;
import com.arun.ag_backend.Dto.TeacherDTO;
import com.arun.ag_backend.Dto.UserDTO;
import com.arun.ag_backend.Entities.*;
import com.arun.ag_backend.Entities.Class;
import com.arun.ag_backend.JSON.AuthResponse;
import com.arun.ag_backend.JSON.CustomResponse;
import com.arun.ag_backend.JWT.JWTService;
import com.arun.ag_backend.Services.*;
import com.arun.ag_backend.UserDetails.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "${cross.origin.url}", allowCredentials = "true")
@RestController
public class Login_SignUp {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private StudentService studentService;

    @Autowired
    private TeacherService teacherService;


    @Autowired
    private Admin_a_User_Service   adminAUserService;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private OTP_Service otpService;

    CustomResponse response = new CustomResponse();
    AuthResponse authResponse = new AuthResponse();



    private String role;

    private Users user1  =  new Users();
    @PostMapping("/signIn")
    public ResponseEntity<Object> signIn(@RequestBody LoginDetails loginDetails){



        Optional<Users> user = userService.finByEmail(loginDetails.getEmail());
        if(user.isPresent()){
            if(!user.get().is_enabled()){
                userService.delete_user(user.get());
            }
        }
        try {
             Authentication authentication = new UsernamePasswordAuthenticationToken(loginDetails.getEmail(),loginDetails.getPassword());

            Authentication authenticated = authenticationManager.authenticate(authentication);

             if (authenticated.isAuthenticated()) {


                CustomUserDetails userDetails = (CustomUserDetails) authenticated.getPrincipal();
                String role = userDetails.getAuthorities().toString();
                String token = jwtService.generateToken(userDetails.getUsername());
//
                 authResponse.setName(userDetails.getUsername());

                 if(role.equals("[Student]")){
                    authResponse.setRole("student");
                 }
                 if(role.equals("[Teacher]")){
                     authResponse.setRole("teacher");

                 }
                 authResponse.setToken(token);

                return ResponseEntity.ok(authResponse);

            } else {
                 response.setMessage("Login Failed");
               return ResponseEntity.ok(response);
            }
        } catch (AuthenticationException e) {
            response.setMessage("Wrong credentails");
            return ResponseEntity.ok(response);
        }
    }




//    @RequestMapping("/register/student")
//    public ResponseEntity<CustomResponse> register_student(@RequestBody StudentDto studentDto){
//
//
//        Users user = studentService.save_student(studentDto);
//         // Replace with your actual confirmation link
//
//        if(user == null){
//           message = "Email Already Exists";
//        }
//        else{
//            OTP otp = new OTP(user);
//            otpService.save_otp(otp);
//            emailService.sendConfirmationEmail(studentDto.getEmail(), String.valueOf(otp.getOtp_token()));
//            message = "Please confirm the OTP code";
//        }
//        // Send confirmation email
////        emailService.sendConfirmationEmail(studentDto.getEmail(), );
////        System.out.println("Mail sent");
//        return ResponseEntity.ok(new CustomResponse(message));
//    }
//
//    @RequestMapping("/register/teacher")
//    public ResponseEntity<CustomResponse> register_Teacher(@RequestBody TeacherDTO teacherDTO){
//
//        Users user = teacherService.save_teacher(teacherDTO);
//        if(user == null){
//            message = "Email Already Exists";
//        }
//        else{
//            OTP otp = new OTP(user);
//            otpService.save_otp(otp);
//            emailService.sendConfirmationEmail(teacherDTO.getEmail(), String.valueOf(otp.getOtp_token()));
//            message = "Please confirm the OTP code";
//        }
//        return ResponseEntity.ok(new CustomResponse(message));
//    }

    @RequestMapping("/signup")
    public ResponseEntity<Object> register(@RequestBody UserDTO userDTO){

        if(adminAUserService.findByEmail(userDTO.getEmail()).isEmpty()){
            response.setMessage("Email does not exist . Please contact to your college");
            return ResponseEntity.ok(response);
        }
        else {
             role = adminAUserService.findByEmail(userDTO.getEmail()).get().getUser_role();
            if(userService.finByEmail(userDTO.getEmail()).isPresent()){

                    if(!userService.finByEmail(userDTO.getEmail()).get().is_enabled())
                    {
                        userService.delete_user(userService.finByEmail(userDTO.getEmail()).get());
                    }else{
                        response.setMessage("Email already exists");

                        return ResponseEntity.ok(response);
                    }
            }
                Users user = Helper.dto_to_entity(userDTO);
                user.setRole(role);


                userService.save_user(user);
                OTP otp = new OTP(user);
                //otp.setUsers(user);
                otpService.save_otp(otp);
                emailService.sendConfirmationEmail(user.getEmail(), String.valueOf(otp.getOtp_token()));
                System.out.println("Mail sent");

                response.setMessage("OTP");
                user1 = user;
                //userService.delete_user(user);

        }


        return ResponseEntity.ok(response);
    }

    @RequestMapping("/signup/confirm_otp")
    public ResponseEntity<Object> confirm_otp(@RequestBody CustomResponse token){

        Optional<OTP> otp = otpService.find_otp(user1);

        if(otp.isPresent())
        {
            if(Integer.valueOf(token.getMessage()) == otp.get().getOtp_token())
            {

                Users user1 = otp.get().getUsers();

                userService.update_value(true , user1.getEmail());
                if (role.equals("Student")) {
                    int roll = adminAUserService.findByEmail(user1.getEmail()).get().getRoll();
                    Class class_id = adminAUserService.findByEmail(user1.getEmail()).get().getAClass() ;
                    studentService.save_student(user1, roll  , class_id);
                }
                if (role.equals("Teacher")) {
                    teacherService.save_teacher(user1);
                }

                response.setMessage("success");
                otpService.delete_otp(user1);
            }else {
                response.setMessage("wrong OTP");
            }
        }else{
            response.setMessage("wrong OTP");
        }

        return ResponseEntity.ok(response);
    }
}
