// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { JwtService } from "@nestjs/jwt";
// import { Admin } from "typeorm";

// @Injectable()
// export class AdminAuthService {
//   constructor(
//     private jwtService: JwtService,
//     private configService: ConfigService
//   ) {}

//   async generateAdminToken(admin: Admin) {
//     const payload: AdminTokenPayload = {
//       sub: admin.id,
//       email: admin.email,
//       role: 'admin',
//       issuedFor: 'admin-panel'
//     };

//     return this.jwtService.signAsync(payload, {
//       secret: this.configService.get<string>('ADMIN_JWT_SECRET'),
//       expiresIn: '360d', // Более длительный срок для админов
//     });
//   }

//   async validateAdminToken(token: string) {
//     try {
//       const payload = await this.jwtService.verifyAsync(token, {
//         secret: this.configService.get<string>('ADMIN_JWT_SECRET')
//       });
      
//       if (payload.issuedFor !== 'admin-panel') {
//         throw new UnauthorizedException();
//       }

//       return payload;
//     } catch {
//       throw new UnauthorizedException();
//     }
//   }
// }