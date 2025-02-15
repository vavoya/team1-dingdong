import { postUserInfo, SignUpRequestType } from "@/api/SignUp/signUp";
import { useMutation } from "@tanstack/react-query";

// export const usePostUserSchoolEmail = () => {
//   const { mutateAsync: postUserSchoolEmailMutation } = useMutation({
//     mutationFn: (email: string) => {
//       return postSendUserSchoolEmail(email);
//     },
//   });
//   return { postUserSchoolEmailMutation };
// };

// export const usePostUserVerificationCode = () => {
//   const { mutateAsync: postUserVerificationCodeMutation } = useMutation({
//     mutationFn: (verificationCode: string) => {
//       return postUserVerificationCode(verificationCode);
//     },
//   });
//   return { postUserVerificationCodeMutation };
// };

export const usePostUserInfo = () => {
  const { mutateAsync: postUserInfoMutation } = useMutation({
    mutationFn: (userInfo: SignUpRequestType) => {
      return postUserInfo(userInfo);
    },
  });
  return { postUserInfoMutation };
};
