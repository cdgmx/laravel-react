import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listUsers } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state.userList); //get userInfo from redux store
  const { userInfo } = useSelector((state) => state.userLogin); //get userInfo from redux store

  const [users, setUsers] = useState([]); //set users to empty array

  useEffect(() => {
    //called when userInfo changes
    if (!userInfo) {
      navigate("../", { replace: true });
    }
  }, [userInfo]);

  useEffect(() => {
    //List user when loaded
    dispatch(listUsers());
  }, []);

  useEffect(() => {
    //called when data changes
    if (data) {
      setUsers(data.users);
    }
  }, [loading, data, navigate]);

  return (
    <div className="container">
      <h1>List of Users</h1>
      <div className="row justify-content-center justify-content-xs-start">
        {users.map((user, index) => {
          return (
            <div key={index} class="card m-2" style={{ width: "18rem" }}>
              <div class="card-body">
                <h5 class="card-title">{user.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{user.email}</h6>
                <p class="card-text">
                  Lorem sint est culpa proident adipisicing ut sit.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersPage;
