import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
	return await bcrypt.hashSync(password, 10);
};

export const verifyPassword = async (data: {
	password: string;
	hash: string;
}) => {
	const { password, hash } = data;
	return await bcrypt.compareSync(password, hash);
};
