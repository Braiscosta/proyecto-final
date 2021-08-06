import { useContext, useEffect, useState } from "react";
import { getUsers } from "../api/api";
import { Link } from "react-router-dom";
import { ErrorContext } from "../components/error";
import "./partnerList.css";

const PartnerList = () => {
  const [, setError] = useContext(ErrorContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const loadPratners = async () => {
      try {
        const res = await getUsers();

        const data = await res.json();
        if (res.ok) {
          setUsers(data);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    loadPratners();
  }, [setError]);

  return (
    <div className="container-partner-aside">
      <h3 className="user-top-title">Colaboradores DPMO</h3>
      <ul>
        {users
          .filter((user) => user.rol === "partner")
          .map((user) => (
            <Link to={`/OtherUserProfile/${user.id}`} key={user.id}>
              <li key={user.id} className="user-li-karma">
                <img
                  className="avatar-top-partner"
                  src={
                    user.avatar
                      ? `${process.env.REACT_APP_STATIC}/images/profiles/${user.avatar}`
                      : "/avatar/defaul-profile-image.png"
                  }
                  alt="avatar"
                />
                <div className="karma-partner">
                  <span className="name-list-partner">{user.name}</span>
                </div>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};
export default PartnerList;
