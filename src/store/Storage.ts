import { MMKVLoader } from "react-native-mmkv-storage";

export const StorageMmkv = new MMKVLoader()
  .withEncryption() // Generates a random key and stores it securely in Keychain
  .initialize();
