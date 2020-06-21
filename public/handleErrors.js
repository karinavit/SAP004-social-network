export const errLogin = [{
  code: 'auth/invalid-email',
  message: 'E-mail inválido, por favor confira se ele foi escrito corretamente',
},
{
  code: 'auth/user-not-found',
  message: 'E-mail não cadastrado, por favor se registre antes de tentar login novamente',
},
{
  code: 'auth/wrong-password',
  message: 'Senha incorreta, favor tentar novamente ou solicitar a recuperação de senha abaixo',
},


];

export const confirmPasswordReset = [{
  code: 'auth/expired-action-code',
  message: 'O código de redefinição de senha expirou.',
},
{
  code: 'auth/invalid-action-code',
  message: 'O código de redefinição de senha é inválido. Isso pode acontecer se o código estiver malformado ou já tiver sido usado.',
},
{
  code: 'auth/user-disabled',
  message: 'O usuário correspondente ao código de redefinição de senha fornecido tiver sido desativado.',
},
{ code: 'auth/user-not-found',
  message: 'Não há usuário correspondente ao código de redefinição de senha. Isso pode ter acontecido se o usuário foi excluído entre quando o código foi emitido e quando esse método foi chamado.',
},
{ code: 'auth/weak-password',
  message:'A nova senha não é forte o suficiente.'
},
]




