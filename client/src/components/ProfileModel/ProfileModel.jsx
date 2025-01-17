import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";
// import { Model } from "mongoose";
//import { updateUser } from "../../../../server/Controllers/UserController";

function ProfileModel({ modelOpened, setModelOpened , data, setter }) {
  const theme = useMantineTheme();

  const {password, followers, following, ...other} = data;
  console.log("dt",other)
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const {user} = useSelector((state)=>state.authReducer.authData);

  const handleChange = (e)=> {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  const onImageChange =(event)=> {
    if(event.target.files && event.target.files[0]){
      let img = event.target.files[0];
      event.target.name ==="profileImage"
      ? setProfileImage(img)
      : setCoverImage(img);
    }
  };

  const handleSubmit =(e)=> {
     e.preventDefault();
     let UserData = formData;
     if(profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name",fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
        
      } catch (err) {
        console.log(err);
      }
     }
     if(coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name",fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
        
      } catch (err) {
        console.log(err);
      }
     }
     dispatch(updateUser(param.id, UserData));
     setter(UserData)
     setModelOpened(false);
  }

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modelOpened}
      onClose={() => setModelOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
          />

          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>

        {/* <div>
          <input
            type="text"
            className="infoInput"
            name="class"
            placeholder="Class"
            onChange={handleChange}
            value={other.class}
          />
        </div> */}

        <div>
          <select
            className="infoInput"
            name="class"
            value={formData.class}
            onChange={handleChange}
          >
            <option value="BTech First Year">BTech First Year</option>
            <option value="BTech Second Year">BTech Second Year</option>
            <option value="BTech Third Year">BTech Third Year</option>
            <option value="BTech Forth Year">BTech Forth Year</option>
            <option value="MCA First Year">MCA First Year</option>
            <option value="MCA Second Year">MCA Second Year</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="LIves in"
            onChange={handleChange}
            value={formData.livesin}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>


        <div>
            Profile Image 
            <input type="file" name='profileImage' onChange={onImageChange}/>
            Cover Image
            <input type="file" name="coverImage"  onChange={onImageChange}/>
        </div>

        <button className="button infoButton" onClick = {handleSubmit}>Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModel;
