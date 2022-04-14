export default interface ProductFormInterface {
  imgData: string | ArrayBuffer;
  imgURL?: string
  name: string;
  price: number;
  description: string;
}