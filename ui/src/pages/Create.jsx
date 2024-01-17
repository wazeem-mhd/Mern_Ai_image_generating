import React, { useState } from "react";
import { FormField, Loader } from "../components";
import { RandomPrompts } from "../utils";
import { preview } from "../assets";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    prompt: "",
    image: "",
  });

  const [generateImages, setGenerateImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const promtText = RandomPrompts(formData.prompt);
    setFormData({ ...formData, prompt: promtText });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (formData.image && formData.image) {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert(
        "Please enter a prompt and generate an Image and share Image with others"
      );
    }
  };

  const handleGenerateImg = async () => {
    if (formData.prompt) {
      setGenerateImage(true);
      const response = await fetch("http://localhost:5000/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: formData.prompt }),
      });

      const data = await response.json();
      // console.log(data);
      setFormData({
        ...formData,
        image: `data:image/jpeg;base64,${data.image}`,
      });

      setGenerateImage(false);
    } else {
      alert("please add a prompt");
    }
  };
  return (
    <div
      className="w-full bg-[#f9fafe] px-4 py-2 sm:p-8 
min-h-[calc(100vh-70px)]"
    >
      <div>
        <h1 className="font-extrabold text-[32px] text-[#222328]">Create</h1>
        <p className="max-w-[500px] text-[16px] mt-2 text-[#666e75]">
          Create imaginative and visually stunning images through Image Ai and
          share them with the comunity
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            name="name"
            type="text"
            value={formData.name}
            handleChange={handleChange}
            placeholder="Jack sparrow"
          />
          <FormField
            labelName="Prompts"
            name="prompt"
            type="text"
            value={formData.prompt}
            handleChange={handleChange}
            isSupriseMe
            placeholder="a painting of a fox in the style of Starry Night"
            handleSurpriseMe={handleSurpriseMe}
          />
          <div
            className="relative bg-gray-50 border border-gray-300 h-64 w-64 p-2.5
          text-gray-900 rounded-lg focus:border-blue-500 focus:ring-blue-300 flex justify-center items-center"
          >
            {formData.image ? (
              <img
                src={formData.image}
                alt={formData.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generateImages && (
              <div
                className="absolute z-0 flex justify-center items-center
              bg-[rgba(0,0,0,0.3)] inset-0 rounded-lg"
              >
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={handleGenerateImg}
            className="py-2.5 px-5 w-full  bg-green-700 text-white font-medium
       rounded-md text-sm text-center sm:w-auto"
          >
            {generateImages ? "Generating..." : "generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="text-[#666e75] text-[14px] ">
            Once you have created the image you want, you can share it with
            others in the comunity
          </p>
          <button
            type="submit"
            className="mt-3 py-2.5 px-5 w-full  bg-blue-600 text-white font-medium
          rounded-md text-sm text-center sm:w-auto"
          >
            {loading ? "Sharing..." : "Share with Community"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
