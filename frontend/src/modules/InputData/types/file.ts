import csv from "csv.csv";
import tsv from "tsv.tsv";
export type File = typeof csv | typeof tsv;
interface IFile {
  id: number;
  file: File;
}
export default IFile;
export interface AddFileDto {
  file: File;
}
