import React, { useContext, useState } from 'react';
import axios from 'axios';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/contexAPI/UserContex';

const OtpPage = () => {

  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleVerifyOTP = async () => {

    setIsVerifying(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_END_POINT}/users/otp-verify`, {
        email: currentUser.email,
        code: otp
      },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("OTP Verified Successfully")
        setIsVerifying(false);
        navigate('/dashboard/users')
      } else {
        alert("OTP Verification Failed")
        setIsVerifying(false);
      }

    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Enter OTP
        </h2>
        <div className="flex justify-center">

          <InputOTP
            maxLength={6}
            value={otp}
            onChange={handleOtpChange}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          onClick={handleVerifyOTP}
          disabled={isVerifying || otp.length !== 6}
          className="w-full mt-6"
        >{isVerifying ? (
          <>
            <Loader2 className="animate-spin" />
            Please wait
          </>
        ) : (
          'Verify OTP'
        )}
        </Button>

      </div>
    </div>
  )
}

export default OtpPage