import authReducer from "../../reducers/auth";

test("should set default state", () => {
  const state = authReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({});
});

test("should set id on login", () => {
  const uid = "test_id_123";
  const action = {
    type: "LOGIN",
    uid
  };
  const state = authReducer({}, action);
  expect(state).toEqual({ uid });
});

test("should clear id on logout", () => {
  const uid = "test_id_123";
  const defaultState = {
    uid
  };
  const action = {
    type: "LOGOUT"
  };
  const state = authReducer(defaultState, action);
  expect(state).toEqual({});
});
