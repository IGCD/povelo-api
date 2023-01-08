# Description
인증 방식 및 회원 등록을 다룹니다.

### Email
모든 회원들의 Email은 표준화(normalize)하여 저장됩니다.

* example:
  * foo@Bar.com -> foo@bar.com
  * fo  o@bar.com -> foo@bar.com

### Password
모든 회원들의 password는 내부의 강한 암호화 방식에 의해 저장되며, 복호화가 불가능합니다.

### Token
Json Web Token(JWT) 방식의 토큰 인증 방식을 사용합니다.