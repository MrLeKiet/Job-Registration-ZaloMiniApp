import React from "react";

const Header: React.FC = () => {
    return (
        <div className="bg-[#62B6CB] px-4 flex items-center shadow-sm gap-2" style={{ paddingTop: 'var(--safe-top)', paddingBottom: '10px' }}>
            <img
                src="https://thongtinvieclamkhanhhoa.vn/assets/images/brand/trung-tam-dich-viec-lam-logo-header.svg"
                alt="Logo Trung tâm dịch vụ việc làm Khánh Hòa"
                style={{ height: 30 }}
            />

        </div>
    )
};

export default Header;
