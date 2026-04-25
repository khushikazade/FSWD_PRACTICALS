mongoose.connect("mongodb+srv://shojal:yourpassword123@cluster0.xxxxx.mongodb.net/mydatabase")
.then(() => {
    console.log("✅ MongoDB Atlas Connected");

    app.listen(5000, () => {
        console.log("🚀 Server running on port 5000");
    });
})
.catch(err => console.log("❌ Error:", err));