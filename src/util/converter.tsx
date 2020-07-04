import { prices, cpus, rams, harddrives, monitors } from "./constants";

export const convertCPUType = (type:String) => {
    switch (type) {
        case "INTEL_CORE_I3":
        case "INTEL_CORE_I5":
        case "INTEL_CORE_I7":
            return type.replace("INTEL_CORE_I", "Intel Core i");
        case "INTEL_CELERON":
            return "Intel Celeron";
        case "INTEL_PENTIUM":
            return "Intel Pentium";
        case "AMD":
            return "AMD";
        default:
            return null;
    }
};

export const convertResolutionType = (type:String) => {
    switch (type) {
        case "WXGA_PLUS":
            return "WXGA+";
        case "HD_PLUS":
            return "HD+";
        case "FULL_HD":
            return "Full HD";
        case "QHD":
            return "2K";
        case "QHD_PLUS":
            return "3K";
        case "UHD":
            return "4K";
        case "CUSTOM":
            return "Độ phân giải";
        default:
            return type;
    }
};

export const convertTypeToQueryType = (type: String) => {
    switch(type) {
        case "Giá rẻ":
            return "cheap";
        case "Sản phẩm mới":
            return "new";
        default:
            return "common";
    }
}

export const convertBrandType = (type:String) => {
    return type === "MSI" ? "MSI" : type.charAt(0) + type.slice(1).toLowerCase();
};

export const convertOrderStatus = (status:String) => {
    switch (status) {
        case "PENDING":
            return "Chờ xử lí";
        case "RECEIVED":
            return "Tiếp nhận";
        case "PACKAGED":
            return "Đóng gói";
        case "DELIVERING":
            return "Vận chuyển";
        case "DELIVERED":
            return "Đã giao";
        case "CANCELED":
            return "Hủy đơn";
        default:
            return null;
    }
};


export const convertToSearchValue = (value: any) => {
    switch(value) {
        case prices[0]:
            return 0;
        case prices[1]: 
            return 15000000;
        case prices[2]:
            return 20000000;
        case prices[3]: 
            return 25000000;
        case prices[4]:
            return 35000000;
        case rams[0]:
            return 0;
        case rams[1]:
            return 4;
        case rams[2]:
            return 8;
        case rams[3]:
            return 12;
        case rams[4]:
            return 16;
        case rams[5]:
            return 32;
        case harddrives[0]:
            return 0;
        case harddrives[1]:
            return 128;
        case harddrives[2]:
            return 256;
        case harddrives[3]:
            return 512;
        case harddrives[4]:
            return 1024;
        case monitors[0]:
            return 0;
        case monitors[1]:
            return 14;
        case monitors[2]:
            return 16;
        default:
            return "";
    }
}