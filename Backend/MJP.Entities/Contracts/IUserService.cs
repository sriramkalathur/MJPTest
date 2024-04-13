using System;
using MJP.Entities.Models;

namespace MJP.Entities.Contracts
{
    public interface IUserService
    {

        User SelectUserDetails(string userName, string password);

        bool IsValidApplicant(string email);

        User SelectApplicantDetails(string userName, string password);

        void RegisterUser(UserRegistrationModel model);

        ValidationError[] ChangePassword(ChangePasswordModel model);

       ValidationError[] ValidateNewUser(UserRegistrationModel model);

       void UpdateProfile(UserProfile profile);


        UserProfile SelectUserProfile(int userId);


         void ResetPassword(string email);

    }
}
