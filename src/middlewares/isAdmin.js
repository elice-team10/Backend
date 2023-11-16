export const isAdmin = (req,res,next)=>{
    const status=req.params.status;
    if(status===1){
        return res.status(403).send("관리자 권한이 없습니다.");
    }
    next();
}