import axios from 'axios';

const token = JSON.parse(localStorage.getItem("ADMIN"));
const headersParam = {
    "Authorization": `Bearer ${token}`
};
// "dsfwdsfsd
let params = (new URL(document.location)).searchParams;
let name = params.get("token");

export const adminLoginApi = async (admin) => await axios.post(`http://localhost:8080/api/admin/login`, admin)

export const adminLogoutApi = async () => await axios.post(`http://localhost:8080/api/admin/logout`, { headers: headersParam })

export const adminChangePasswordApi = async (adminChangePassword) => await axios.post('http://localhost:8080/api/admin/change_password', adminChangePassword, { headers: headersParam })

export const adminResetPasswordApi = async (adminResetPassword) => await axios.post(`http://localhost:8080/api/admin/reset_password/${name}`, adminResetPassword, { headers: headersParam })

export const adminForgotPasswordApi = async (adminForgotPassword) => await axios.post('http://localhost:8080/api/admin/forgot_password', adminForgotPassword, { headers: headersParam })

export const loadAdminApi = async () => await axios.get('http://localhost:8080/api/admin', { headers: headersParam })

export const createAdminApi = async (admin) => await axios.post('http://localhost:8080/api/admin/create', admin)

export const getSingleAdminApi = async (id) => await axios.get(`http://localhost:8080/api/admin/${id}`, { headers: headersParam })

export const deleteAdminApi = async (id) => await axios.delete(`http://localhost:8080/api/admin/delete/${id}`, { headers: headersParam })

export const updateAdminApi = async (updateAdmin) => await axios.post(`http://localhost:8080/api/admin/update/${updateAdmin.get('id')}`, updateAdmin, { headers: headersParam })