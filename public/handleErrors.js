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
  message: 'Lançado se o código de redefinição de senha expirou.',
},
{
  code: 'auth/invalid-action-code',
  message: 'Lançado se o código de redefinição de senha for inválido. Isso pode acontecer se o código estiver malformado ou já tiver sido usado.',
},
{
  code: 'auth/user-disabled',
  message: 'Lançado se o usuário correspondente ao código de redefinição de senha fornecido tiver sido desativado.',
},
{ code: 'auth/user-not-found',
  message: 'Lançado se não houver usuário correspondente ao código de redefinição de senha. Isso pode ter acontecido se o usuário foi excluído entre quando o código foi emitido e quando esse método foi chamado.',
},
]


