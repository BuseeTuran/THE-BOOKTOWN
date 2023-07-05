export default function (errorCode) {
    switch (errorCode) {
        case "auth/invalid-email":
            return "Geçersiz e-posta adresi";

        case "auth/user-not-found":
            return "Kullanıcı bulunamadı";
    
        case "auth/weak-password":
            return "Parola çok zayıf";
    
        case "auth/email-already-exists":
            return "Kullanıcı zaten kayıtlı";
    
        case "auth/wrong-password":
            return "Parola geçersiz";

        case "auth/email-already-in-use":
            return "Kullanıcı zaten kayıtlı"
    
        default:
            return errorCode;
    }
}