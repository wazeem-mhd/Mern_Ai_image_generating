import React from "react";
import { surprisePrompts } from "../constants";
import FileSaver from "file-saver";

export const RandomPrompts = (previousPromt) => {
  const randomTextIndex = Math.floor(Math.random() * surprisePrompts.length);

  const randomText = surprisePrompts[randomTextIndex];

  if (randomText == previousPromt) {
    return RandomPrompts(randomText);
  }

  return randomText;
};

export const downloadImage = async (_id, image) => {
  FileSaver.saveAs(image, `download-${_id}.jpg`);
};
