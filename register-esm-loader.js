import { register } from "module";
import { pathToFileURL } from "url";

const loader = "@esbuild-kit/esm-loader";
register(loader, pathToFileURL("./"));
