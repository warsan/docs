/* eslint-disable no-console */

import path from "path";

export class ErrorCollector {
  constructor(workingDir) {
    this.filesAndErrors = [];
    this.workingDir = workingDir;
  }

  expectSuccess(filePath, error) {
    if (error != null) {
      this.filesAndErrors.push({ filePath, error });
    }
  }

  expectError(filePath, error) {
    if (error == null) {
      this.filesAndErrors.push({
        filePath,
        error: { message: "Ожидается ошибка, но ошибок не обнаружено", 
                 stack: "Ожидается ошибка, но ошибок не обнаружено" }
      });
    }
  }

  failOnErrors() {
    console.log("Проверка на ошибки в примере");
    this.filesAndErrors.forEach(fileAndError => {
      console.error("Example " + fileAndError.filePath + " has error " + fileAndError.error.stack);
    });
    if (this.filesAndErrors.length > 0) {
      let relativeErrorPaths = this.filesAndErrors.map(fileAndError =>
        path.relative(process.cwd(), fileAndError.filePath)
      );
      throw new Error("Обнаружены ошибки в файлах примеров (" + relativeErrorPaths + "). См. Сообщения об ошибках выше.");
    }
    console.log("done");
  }
}
