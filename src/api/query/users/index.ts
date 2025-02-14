import {createQueryFactory} from "@/api/query/createQueryFactory.ts";


export interface users_me_interface {
    userName: string;
    email: string;
    schoolName: string
}
export const users_me = createQueryFactory('/api/users/me');

export interface users_reservations_interface {
    reservationInfos: {
        content: {
            reservationId: number;
            startDate: string;
            busStopName: string;
            direction: 'TO_SCHOOL' | 'TO_HOME';
            expectedArrivalTime: string | null;
            expectedDepartureTime: string | null;
            reservationStatus: 'PENDING' | 'ALLOCATED' | 'FAIL_ALLOCATED' | 'CANCELED';
            operationInfo: {
                busScheduleId: number;
                busStatus: 'READY' | 'RUNNING' | 'ENDED';
                busName: string;
                busStopArrivalTime: string;
            } | null;
        }[];
        empty: boolean;
        first: boolean;
        last: boolean;
        number: number;
        numberOfElements: number;
        pageable: {
            offset: number;
            pageNumber: number;
            pageSize: number;
            paged: boolean;
            sort: {
                empty: boolean;
                sorted: boolean;
                unsorted: boolean;
            }
        }
        size: number;
        totalElements: number;
        totalPages: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        }
    }
}
export const users_reservations = createQueryFactory('/api/users/reservations');

export interface users_notifications_checkUnread_interface {
    hasUnreadNotifications: boolean
}
export const users_notifications_checkUnread = createQueryFactory('/api/users/notifications/check-unread');

export interface users_home_locations_interface {
    houseInfo: {
        latitude: number;
        longitude: number;
    }
    stationInfo: {
        latitude: number;
        longitude: number;
        name: string;
    }
}
export const users_home_locations = createQueryFactory('/api/users/home/locations');