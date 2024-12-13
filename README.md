# ASCII Art Generator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

A web-based ASCII Art Generator that transforms your images into ASCII art. This project uses Java servlets for backend processing and vanilla JavaScript for the frontend.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Troubleshooting](#troubleshooting)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Upload and convert images to ASCII art
- Responsive design for various screen sizes
- Light and dark mode toggle
- Copy generated ASCII art to clipboard
- Error handling and user notifications

## Demo

![Screenshot of Actual Working ASCII Art Generator](https://i.imgur.com/pv4Yol4.png)
![Screenshot of Actual Working ASCII Art Generator](https://i.imgur.com/YtlKCPs.png)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Java Development Kit (JDK) 11 or later
- Apache Maven 3.6.0 or later
- Apache Tomcat 9.0 or later (or any other Java servlet container)
- Git (for cloning the repository)

## Installation

Follow these steps to set up the ASCII Art Generator locally:

1. Open a terminal or command prompt.

2. Clone the repository:

```
git clone [https://github.com/dxvzz/ASCII-Art-Generator.git](https://github.com/dxvzz/ASCII-Art-Generator.git)
```

3. Navigate to the project directory:

```
cd ASCII-Art-Generator
```

4. Build the project using Maven:

```
mvn clean package
```

5. The build process will create a WAR file in the `target` directory. Copy this WAR file to your Tomcat's `webapps` directory:

```
cp target/ascii-art-generator.war /path/to/tomcat/webapps/
```

6. Start your Tomcat server:

```
/path/to/tomcat/bin/startup.sh  # On Unix-based systems
/path/to/tomcat/bin/startup.bat  # On Windows
```

7. Once Tomcat has started, the application should be accessible at:

http://localhost:8080/ascii-art-generator

## Troubleshooting

If you encounter issues during installation or startup, try the following:

1. Ensure all prerequisites are correctly installed and configured.

2. Check Tomcat logs for any error messages:

```
tail -f /path/to/tomcat/logs/catalina.out
```

3. Verify that the WAR file was successfully deployed by checking the `webapps` directory for an `ascii-art-generator` folder.

4. If the application doesn't start, try restarting Tomcat:

```
/path/to/tomcat/bin/shutdown.sh && /path/to/tomcat/bin/startup.sh  # On Unix-based systems
/path/to/tomcat/bin/shutdown.bat && /path/to/tomcat/bin/startup.bat  # On Windows
```

5. Ensure that port 8080 is not being used by another application.

6. If you're still experiencing issues, please open an issue on the GitHub repository with detailed information about the problem and your environment.

## Usage

1. Open your web browser and navigate to `http://localhost:8080/ascii-art-generator`.

2. Click on the "Choose an image" button to select an image file.

3. Click "Generate ASCII Art" to convert your image.

4. Once generated, you can copy the ASCII art using the "Copy" button.

5. Toggle between light and dark modes using the switch in the top-right corner.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

- [Font Awesome](https://fontawesome.com) for the icons
- [Imgscalr](https://github.com/rkalla/imgscalr) for image processing

---

Made with ❤️ by Devdatta Mudliar
