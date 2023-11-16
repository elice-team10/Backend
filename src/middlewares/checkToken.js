import jwt from "jsonwebtoken";

export const checkToken = (req,res,next)=>{ //헤더에 저장된 토큰의 유무를 체크하고 복호화하여 userId 반환
    const isToken = req.headers.authorization;

    if(!isToken){
       return res.status(404).send("로그인 해주세요");
    }

    const data = jwt.verify(isToken.substr(7),process.env.jwt_key)
    /*
        1. data.status 값을 확인하여 admin(0)이면 통과
        2. req.params.userId 값과 비교하여 같으면 통과
        3. 둘다 아니면 회원정보가 일치 않다는 에러처리
    */
    req.params.userId=data.userId;
    req.params.status=data.status;
    next();
}
