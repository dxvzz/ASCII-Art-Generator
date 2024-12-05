package com.devdattamudliar.asciiart;

import org.imgscalr.Scalr; // Importing the imgscalr library for image resizing

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;

// Annotation to define the servlet name and URL pattern
@WebServlet(name = "AsciiArtServlet", urlPatterns = {"/AsciiArtServlet"})
// Annotation to indicate that the servlet expects multipart/form-data requests (for file uploads)
@MultipartConfig
public class AsciiArtServlet extends HttpServlet {
    // String containing the characters used to represent different shades in the ASCII art
    private static final String ASCII_CHARS = "@%#*+=-:. ";
    // Maximum width of the resized image
    private static final int MAX_WIDTH = 100;
    // Maximum height of the resized image
    private static final int MAX_HEIGHT = 100;

    // Method to handle POST requests (when the form is submitted)
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Get the uploaded image file from the request
        Part filePart = request.getPart("image");
        // Get an input stream to read the file content
        InputStream fileContent = filePart.getInputStream();

        // Read the image file and create a BufferedImage object
        BufferedImage originalImage = ImageIO.read(fileContent);

        // Check if the image was loaded successfully
        if (originalImage != null) {
            // Resize the image to the defined maximum dimensions
            BufferedImage resizedImage = resizeImage(originalImage);
            // Convert the resized image to ASCII art
            String asciiArt = convertToAscii(resizedImage);
            // Set the response content type to plain text
            response.setContentType("text/plain");
            // Write the ASCII art to the response
            response.getWriter().write(asciiArt);
        } else {
            // If the image is invalid, send a bad request error response
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid image file");
        }
    }

    // Method to resize the image using the imgscalr library
    private BufferedImage resizeImage(BufferedImage originalImage) {
        return Scalr.resize(originalImage, Scalr.Method.SPEED, Scalr.Mode.FIT_TO_WIDTH, MAX_WIDTH, MAX_HEIGHT);
    }

    // Method to convert the image to ASCII art
    private String convertToAscii(BufferedImage image) {
        // StringBuilder to store the ASCII art
        StringBuilder result = new StringBuilder();
        // Get the width and height of the image
        int width = image.getWidth();
        int height = image.getHeight();

        // Iterate over the image pixels (with a step of 2 in the y-direction)
        for (int y = 0; y < height; y += 2) {
            for (int x = 0; x < width; x++) {
                // Get the color of the current pixel
                Color pixelColor = new Color(image.getRGB(x, y));
                // Calculate the grayscale value of the pixel
                double grayScale = (pixelColor.getRed() * 0.299) + (pixelColor.getGreen() * 0.587) + (pixelColor.getBlue() * 0.114);
                // Calculate the index of the character in the ASCII_CHARS string based on the grayscale value
                int index = (int) Math.floor(grayScale * (ASCII_CHARS.length() - 1) / 255);
                // Append the corresponding character to the result
                result.append(ASCII_CHARS.charAt(index));
            }
            // Add a newline character at the end of each row
            result.append("\n");
        }

        // Return the generated ASCII art as a string
        return result.toString();
    }
}