"use client"
import { useSelector } from "react-redux";
import SignupForm from "./SignupForm";
import VerifyOTP from "./VerifyOTP";

export default function page() {
  const signupState = useSelector((state: { signupState: { pageState: any } }) => state.signupState.pageState);
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[36rem] mt-10">
        {signupState === "create" ?
          <SignupForm /> 
          :
          <VerifyOTP />
        }
      </div>
    </div>
  );
}
