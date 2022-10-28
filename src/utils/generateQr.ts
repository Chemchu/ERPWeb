const GenerateQrBase64 = async (id: string, abortController: AbortController): Promise<string | undefined> => {
  try {
    const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`, {
      signal: abortController.signal,
    });
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);

    if (imageObjectURL) {
      return imageObjectURL;
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
};

export default GenerateQrBase64;
