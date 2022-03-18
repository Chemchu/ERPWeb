const GenerateQrBase64 = async (id: any): Promise<string> => {
    const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);

    return imageObjectURL;
}

export default GenerateQrBase64;