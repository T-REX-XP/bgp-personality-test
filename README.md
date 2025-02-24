# Personality Test App

This is a web-based personality test application built with React. It presents users with a series of questions and provides a simple interface for answering them. The application is designed to be responsive and user-friendly.

## Features

*   **Interactive Questions:** Presents a series of questions with a range of answer options.
*   **Paginated Interface:** Divides the questions into manageable pages for better user experience.
*   **Real-time Validation:** Checks if all questions on the current page are answered before allowing navigation to the next page.
*   **Submission Handling:** Collects and displays the user's responses upon completion of the test.
*   **Responsive Design:** Adapts to different screen sizes for optimal viewing on various devices.
*   **Modular Architecture:** Built with reusable components for maintainability and scalability.

## Tech Stack
*   **React:** JavaScript library for building user interfaces.
*   **TypeScript:** Adds static typing to JavaScript for improved code quality and maintainability.
*   **Vite:** Fast build tool and development server.
*   **CSS:** For styling the application.

## Installation

To get started with this project, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>  # (Replace <repository_url> with the actual URL)
    # Since we are in a sandboxed environment, this step is conceptual.
    cd bgp-personality-test
    ```
2.  **Install dependencies:**

    ```bash
    npm install
    ```

## Usage

To run the application locally:

1.  **Start the development server:**

    ```bash
    npm run dev
    ```

2.  **Open your browser and navigate to the provided URL** (usually `http://localhost:5173` or similar, it will be displayed in the console).

3.  **Take the test:** Answer the questions on each page by selecting the radio button that best describes you.

4.  **Navigate:** Use the "Previous" and "Next" buttons to move between pages.  You must answer all questions on a page before proceeding to the next.

5.  **Submit:** On the final page, click the "Submit" button to see your responses (logged to the console).

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

1.  **Report Issues:** If you find any bugs or have suggestions for improvements, please open an issue on the GitHub repository.
2.  **Submit Pull Requests:**
    *   Fork the repository.
    *   Create a new branch for your feature or bug fix.
    *   Make your changes and commit them with clear, descriptive messages.
    *   Push your branch to your forked repository.
    *   Open a pull request to the main repository's `main` branch.
3.  **Code Style:** Please follow the existing code style and conventions used in the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. (Note: You would need to create a LICENSE file with the MIT License text if you were deploying this to a real repository.)
