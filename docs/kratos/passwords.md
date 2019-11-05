## Password Strategies


DefaultPasswordValidationStrategy implements a default strategy for validating passwords. It is based on best
practices as defined in the following blog posts:

- https://www.troyhunt.com/passwords-evolved-authentication-guidance-for-the-modern-era/
- https://www.microsoft.com/en-us/research/wp-content/uploads/2016/06/Microsoft_Password_Guidance-1.pdf

Additionally passwords are being checked against Troy Hunt's
[haveibeenpwnd](https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange) service to check if the
password has been breached in a previous data leak using k-anonymity.


## No password repeat

https://uxmovement.com/forms/why-the-confirm-password-field-must-die/

