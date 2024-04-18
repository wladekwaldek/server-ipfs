import CryptoJS from "crypto-js";

export async function encrypt() {
  let keys = Object.keys(localStorage);
  const noutsArray = [];
  const secretKey = "SuperSecretKey123";
  for (let key of keys) {
    // Текст, который нужно зашифровать
    const originalText = JSON.parse(localStorage.getItem(key));

    const categoriesData = { [key]: originalText };
    if (key !== "user") noutsArray.push(categoriesData);
  }
  console.log(noutsArray);
  const encryptedText = CryptoJS.AES.encrypt(
    JSON.stringify(noutsArray),
    secretKey
  ).toString();
  // // console.log("Зашифрованный текст:", encryptedText);
  const response = await fetch("/api/encrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ data: encryptedText }),
  });

  let result = await response.json();
  console.log(result);
  alert(result.data);
  // // Расшифрование
  try {
    const bytes = CryptoJS.AES.decrypt(result.data, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    console.log("Расшифрованный текст:", decryptedText);
  } catch (e) {
    alert(e.message);
  }
}

export function loadFile() {
  let keys = Object.keys(localStorage);
  const noutsArray = [];
  for (let key of keys) {
    const originalText = JSON.parse(localStorage.getItem(key));

    const categoriesData = { [key]: originalText };
    if (key !== "user") noutsArray.push(categoriesData);
  }
  const data = JSON.stringify(noutsArray);
  console.log(data);

  if (data) {
    // Создаем объект Blob из данных JSON
    const blob = new Blob([data], { type: "application/json" });

    // Создаем ссылку для загрузки файла
    const url = URL.createObjectURL(blob);

    // Создаем ссылку для скачивания файла
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);

    // Запускаем скачивание файла
    a.click();

    // Удаляем ссылку из DOM
    document.body.removeChild(a);
  } else {
    console.error("No data found in localStorage");
  }
}
