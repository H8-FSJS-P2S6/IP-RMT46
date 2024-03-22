import Navbar from "../components/Navbar";


export default function AboutUs() {

    return (
        <>
            <Navbar />
            <div className="container mt-5 p-5">
                <h2>About Us</h2>
                <p>
                    Welcome to our website! We are a team of passionate individuals dedicated to providing high-quality products/services and excellent customer experiences.
                </p>
                <p>
                    Our mission is to [insert mission statement here]. We strive to [insert goals/objectives here].
                </p>
                <h3>Our Team</h3>
                <p>
                    Meet the talented individuals behind our company:
                </p>
                <ul>
                    <li>John Doe - CEO</li>
                    <li>Jane Smith - Marketing Manager</li>
                    <li>Michael Johnson - Lead Developer</li>
                    {/* Add more team members as needed */}
                </ul>
                <h3>Our Story</h3>
                <p>
                    Our company was founded in [insert year] with the vision of [insert vision/goal]. Since then, we have been committed to delivering excellence in every aspect of our business.
                </p>
                <p>
                    We started small, but with dedication and hard work, we have grown into a reputable company known for [insert achievements/success stories].
                </p>
                <h3>Contact Us</h3>
                <p>
                    If you have any questions or inquiries, feel free to reach out to us:
                </p>
                <p>Email: info@example.com</p>
                <p>Phone: +1234567890</p>
            </div>
        </>
    )
}