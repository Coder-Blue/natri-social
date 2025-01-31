import { useState } from "react";
import useShowToast from "@/hooks/useShowToast";

export default function usePreviewImg() {
  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();
  const maxFileSizeInBytes = 2 * 1024 * 1024;

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSizeInBytes) {
        showToast("Error", "Kích thước ảnh không được lớn quá 2MB.", "error");
        setSelectedFile(null);
        return;
      }
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      showToast("Error", "Hãy chọn một file hình ảnh", "error");
      setSelectedFile(null);
    }
  }

  return { selectedFile, handleImageChange, setSelectedFile };
}
