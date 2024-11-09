import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from "@repo/db/client";

const prisma=new PrismaClient()
const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'email', type: 'email', placeholder: '' },
          password: { label: 'password', type: 'password', placeholder: '' },
          name:{label:'name',type:'text',placeholder:"nandeesh"}
        },
        async authorize(credentials: any):Promise<any> {
            let {email,password,name,file}=credentials;

            


      
            console.log("backed activated!");
            
              console.log(file);
              

            let data=await prisma.user.findFirst({where:{
                email,
             
            },
            

        })
              console.log(data);
              

            if(data){
                return {
                 
                    id:data.id,
                    name:data.name,
                    email:data.email,
                }
            }
            
            
            else{
               let response= await prisma.user.create({

                    data:{
                        name,email,password,link:file
                    }

                })

                if(response){
                    return {
                       id:response.id,
                      
                       name,
                       email
                    }
                }
            }


            return null
        },

        

        
      })



  ],
  pages: {
    signIn: '/signin',  // Custom sign-in page
    error: '/error',    // Custom error page (optional)
  },
  secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
      jwt: async ({ user, token }: any) => {
	      if (user) {
            console.log(user);
             
	          token.name = user.name;
              token.email = user.email;
              token.id=user.id;
	      }
          
          
	      return token;
      },
    session: ({ session, token, user }: any) => {
        if (session.user) {
       
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
        }

        
        return session
    }
  },

})

export { handler as GET, handler as POST }