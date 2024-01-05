import { useDispatch, useSelector } from "react-redux";
import "./Account.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { logout, updateUser } from "../../features/Users/UserSlice";

export const Account = () => {
  const user = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  const { firstName, lastName, userName, mobileNumber, password, address } =
    user;

  // useState for storing and updating user details
  const [userDetails, setUserDetails] = useState({
    firstName,
    lastName,
    userName,
    mobileNumber,
    password,
    address,
  });

  // Edit setter
  const [allowEdit, setAllowEdit] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    addressType: "",
    addressInfo: "",
  });

  // Saving the edited data

  const saveButtonHandler = () => {
    try {
      dispatch(updateUser({ userId: user._id, updatedDetails: userDetails }));

      setAllowEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Saving address data

  const addressButtonHandler = () => {
    try {
      if (addressDetails.addressType && addressDetails.addressInfo) {
        dispatch(
          updateUser({
            userId: user._id,
            updatedDetails: {
              ...userDetails,
              address: [...userDetails.address, addressDetails],
            },
          })
        );

        setAllowEdit(false);
      } else {
        toast.error("Fill the address fields");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // UI
  return (
    <div className="cart-container">
      <div className="util-container">
        <h2 className="font-weight-500">
          Hello, {firstName} {lastName}
        </h2>

        <div className="dotted-line"></div>

        <p className="font-weight-400 ">
          Welcome to your Gadget Lo profile! Dive into a seamless shopping
          experience tailored just for you. Manage orders, explore
          recommendations, and effortlessly update your preferences. Discover
          exclusive deals and track your favorite products, making every visit
          uniquely yours. Happy shopping!
        </p>

        <div className="dotted-line"></div>

        <button
          className="add-to-cart-button fb641b width-100px"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </button>
      </div>

      <div className="information-container">
        <h2 className="font-weight-500">My Account</h2>

        <div className="dotted-line"></div>

        {/* Name */}

        <div className="flex-row gap-10px">
          <p>Name</p>
          {!allowEdit && (
            <span onClick={(e) => setAllowEdit(true)} className="blue">
              Edit
            </span>
          )}

          {allowEdit && (
            <span onClick={(e) => setAllowEdit(false)} className="blue">
              Cancel
            </span>
          )}
        </div>

        <div className="flex-row gap-10px mobile-flex-column">
          <input
            className="input-style"
            disabled={allowEdit ? false : true}
            defaultValue={firstName}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                firstName: e.target.value,
              })
            }
          />

          <input
            className="input-style mobile-flex-column"
            disabled={allowEdit ? false : true}
            defaultValue={lastName}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                lastName: e.target.value,
              })
            }
          />

          {allowEdit && (
            <button
              onClick={saveButtonHandler}
              className="add-to-cart-button fb641b width-100px"
            >
              Save
            </button>
          )}
        </div>

        {/* UserName */}

        <div className="flex-row gap-10px ">
          <p>Mobile Number</p>
          {!allowEdit && (
            <span onClick={(e) => setAllowEdit(true)} className="blue">
              Edit
            </span>
          )}

          {allowEdit && (
            <span onClick={(e) => setAllowEdit(false)} className="blue">
              Cancel
            </span>
          )}
        </div>

        <div className="flex-row gap-10px mobile-flex-column">
          <input
            className="input-style"
            disabled={allowEdit ? false : true}
            defaultValue={mobileNumber}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                mobileNumber: e.target.value,
              })
            }
          />

          {allowEdit && (
            <button
              onClick={saveButtonHandler}
              className="add-to-cart-button fb641b width-100px"
            >
              Save
            </button>
          )}
        </div>

        {/* Password */}

        <div className="flex-row gap-10px ">
          <p>Password</p>
          {!allowEdit && (
            <span onClick={(e) => setAllowEdit(true)} className="blue">
              Edit
            </span>
          )}

          {allowEdit && (
            <span onClick={(e) => setAllowEdit(false)} className="blue">
              Cancel
            </span>
          )}
        </div>

        <div className="flex-row gap-10px mobile-flex-column">
          <input
            className="input-style"
            type={allowEdit ? "text" : "password"}
            disabled={allowEdit ? false : true}
            defaultValue={password}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                password: e.target.value,
              })
            }
          />

          {allowEdit && (
            <button
              onClick={saveButtonHandler}
              className="add-to-cart-button fb641b width-100px"
            >
              Save
            </button>
          )}
        </div>

        {/* Address */}

        <div className="flex-row gap-10px">
          <p>Manage Addresses</p>
          {!allowEdit && (
            <span onClick={(e) => setAllowEdit(true)} className="blue">
              Edit
            </span>
          )}

          {allowEdit && (
            <span onClick={(e) => setAllowEdit(false)} className="blue">
              Cancel
            </span>
          )}
        </div>

        <div>
          {/* When no address exists for the user */}
          {address.length === 0 && (
            <p>No address are saved by the user. Add a new one!</p>
          )}

          {/* Display address */}
          {address.length > 0 &&
            address.map((item, idx) => {
              return (
                <div className="address-container" key={idx}>
                  <p className="address-type-icon">{item.addressType}</p>
                  <p className="font-weight-400">{item.addressInfo}</p>
                </div>
              );
            })}

          {!allowEdit && (
            <button
              onClick={(e) => setAllowEdit(true)}
              className="add-to-cart-button fb641b width-auto margin-10px"
            >
              Add a new address
            </button>
          )}

          {allowEdit && (
            <div className="address-form mobile-flex-column border-1px-lightgray padding-10px ">
              <div className="flex-row gap-10px mobile-flex-column">
                <p>Address Type:*</p>
                <input
                  className="input-style width-100"
                  onChange={(e) =>
                    setAddressDetails({
                      ...addressDetails,
                      addressType: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex-row gap-10px mobile-flex-column">
                <p>Address:*</p>
                <textarea
                  className="input-style width-100"
                  onChange={(e) =>
                    setAddressDetails({
                      ...addressDetails,
                      addressInfo: e.target.value,
                    })
                  }
                />
              </div>

              <button
                onClick={addressButtonHandler}
                className="add-to-cart-button fb641b width-100px"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Container end */}
      </div>
    </div>
  );
};
