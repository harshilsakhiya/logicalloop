import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gender, setGender] = useState<string>("");
  const [status, setStatus] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: "",
  });

  const changeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    if (id) {
      getUserById();
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getUserById = async () => {
    setLoading(true);
    const res: any = await axios.get(
      `https://gorest.co.in/public/v1/users/${id}`
    );
    if (res?.status === 200) {
      setInput({
        email: res?.data?.data?.email,
        name: res?.data?.data?.name,
      });
      setGender(res?.data?.data?.gender);
      setStatus(res?.data?.data?.status === "inactive" ? false : true);
      setLoading(false);
    }
  };

  const userUpdate = async () => {
    const data = {
      name: input.name,
      email: input.email,
      gender: gender,
      status: status === true ? "active" : "inactive",
    };
    const res: any = await axios.put(
      `https://gorest.co.in/public/v1/users/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer fab41342f66c3896bb8fb0f920eaca1a7b4fad38666f586fb5c7d7655fdfb1d3`,
        },
      }
    );
    if (res?.status === 200) {
      navigate("/");
      toast.success("user data edit successfully");
    }
  };
  return (
    <div>
      <h1 className="d-flex justify-content-center">User Edit </h1>

      {loading ? (
        <h1 className="d-flex justify-content-center align-items-center vh-100">
          Loading...
        </h1>
      ) : (
        <div className="col-12 d-flex justify-content-center">
          <div className="m-3 col-5 ">
            <div className=" border p-3 ">
              <div>
                <p>name</p>
                <input
                  className="m-1 form-control"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="enter your name"
                  onChange={(e) => changeEvent(e)}
                  value={input.name}
                />
              </div>

              <div>
                <p>email </p>
                <input
                  className=" m-1 form-control"
                  type="email"
                  name="email"
                  placeholder="name123@gmail.com"
                  onChange={(e) => changeEvent(e)}
                  value={input.email}
                />
              </div>

              <div className="form-check form-switch mt-3  d-flex">
                <div className="d-flex">
                  <p className="form-check-label mx-3">Gender</p>
                  <input
                    type="checkbox"
                    value="male"
                    checked={gender === "male" ? true : false}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <p className="mx-2">Male</p>
                </div>
                <div className="d-flex">
                  <input
                    type="checkbox"
                    value="female"
                    checked={gender === "female" ? true : false}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <p className="mx-2">Female</p>
                </div>
              </div>

              <div className="form-check form-switch d-flex">
                <p className="form-check-label">Status</p>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  style={{ marginLeft: "30px" }}
                />
              </div>

              <div>
                <button
                  className="btn btn-success mt-3"
                  onClick={() => userUpdate()}
                >
                  update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
