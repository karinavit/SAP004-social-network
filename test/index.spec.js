import { login } from "../public/firebaseservice.js";
import { firebaseActions } from "../public/data.js";

jest.mock("../public/firebaseservice.js");

const email = "testefire@teste.com";
const password = "123456";

describe("loginData", () => {
  it('loginData', async () => {
    login.mockResolvedValueOnce();
    await expect(firebaseActions.loginData(email, password)).resolves.toEqual(undefined);
  });
});
