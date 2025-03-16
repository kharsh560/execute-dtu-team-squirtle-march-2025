const serverHealthCheck = (_ , res) => {
    res.status(200).json({message: "The server has spun up successfully on port 5600!"});
};

export {serverHealthCheck};