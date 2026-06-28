import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from 'bcrypt'
import crypto from "crypto";
import { signAccessToken, signRefreshToken } from "../common/helper/jwt.helper.js";
export const authService = {
   async register(req) {
      const {email,password,name} = req.body;

      if(email && password && name == ""){
        throw new Error("Vui lòng điền đầy đủ các thông tin đăng nhập")
      }
      
      //kiểm tra user đã tồn tại chưa
      const existingUser = await prisma.users.findUnique({
        where:{
            email:email
        }
      })

      //nếu đã tồn tại thì thông báo đổi email khác để đăng ký
      if(existingUser){
        throw new Error("Email đã được đăng ký trước đó.Vui lòng dùng Email khác!")
      }

    //kiểm tra xem password có độ dài đúng yêu cầu không
      if(password.length < 6){
        throw new Error("Yêu cầu Password có độ dài 6 ký tự trở lên")
      }

      //nếu password đạt được yêu cầu
      //băm password bằng hash
      const hashPassword = bcrypt.hashSync(password,10);

      //nếu đáp ứng được các điều kiện thì tạo User mới trong db
      const newUser = await prisma.users.create({
        data:{
            email:email,
            password:hashPassword,
            name:name
        }
      });
      return `true`;
   },

   async login(req) {
    //lấy email và pass từ client
        const {email,password} = req.body;

    //kiểm tra user có tồn tại trong db chưa
        const existingUser = await prisma.users.findUnique({
            where:{
                email:email
            }
        });

    //trường hợp chưa đăng ký tài khoản
        if(!existingUser){
            throw new Error("Email chưa được đăng ký!")
        }

    // so sánh password nhận từ body request và password đã hash trong db
        const checkPass = await bcrypt.compare(password,existingUser.password)

    //nếu pass sai thông báo lỗi,yêu cầu nhập lại
        if(!checkPass){
            throw new Error("Thông tin đăng nhập sai,vui lòng kiểm tra!!")
        }

        //nếu qua hết các bước kiểm tra email và password đồng nghĩa việc được đăng nhập
        //tiếp tới tạo jwt => accessToken,refreshToken
        
    //tạo acess token
    //B1:tạo payload chứa các thông tin của user
    const payload = {
        userId:existingUser.id,
        email:existingUser.email
    }

    //B1:tạo access token từ payload.Dùng jwt.hepler
    const accessToken = signAccessToken(payload)

    //B2:tạo refreshtoken từ payload.Dùng jwt.hepler
    const refreshToken = signRefreshToken(payload)
      return {
        accessToken,
        refreshToken
      };
   },

   async getInfo(req) {
    const {id,name,email,created_at} = req.user
      return {
        id,
        name,
        email,
        created_at
      };
   },

   async update(req) {
      return `This action updates a id: ${req.params.id} auth`;
   },

   async remove(req) {
      return `This action removes a id: ${req.params.id} auth`;
   }
};