"use client"
import { DataTable } from "./data-table";
import { getTipOffs } from "@/app/lib/actions"
import React, { useEffect, useState } from "react"
import TableLoadingSkeleton from "../../TableLoadingSkeleton";
import { tipoffsColumns } from "./tipoffs-columns";
import { roleObjects } from "@/app/lib/store";

interface WorkProps {
    status: string;
    userRole: string;
}

interface TipOff {
    application_id: string,
    user_id: string,
    reg_status: string,
    first_name: string,
    tipoff_number: string,
    middle_name: string,
    surname: string,
    primary_email: string,
    primary_phone: string,
    primary_postal: string,
    gender: string,
    nationality: string,
    breach_nature: string,
    breach_description: string,
    breach_location: string,
    breach_date: string,
    profile_data_consent: true,
    service_id: string,
    service_name: string,
    service_version: string
}

// Updated utility function to safely handle null values and prevent recursion
const replaceNullWithEmptyString = (data: any): any => {
    // If data is null or undefined, return empty string
    if (data === null || data === undefined) {
        return '';
    }

    // If data is not an object (including arrays), return as is
    if (typeof data !== 'object') {
        return data;
    }

    // Handle arrays
    if (Array.isArray(data)) {
        return data.map(item => replaceNullWithEmptyString(item));
    }

    // Handle objects
    const result: { [key: string]: any } = {};
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];
            result[key] = replaceNullWithEmptyString(value);
        }
    }
    return result;
};

// Helper function to safely process the API response
const processApiResponse = (data: any[]): TipOff[] => {
    return data.map(item => ({
        application_id: item.application_id || '',
        user_id: item.user_id || '',
        reg_status: item.reg_status || '',
        first_name: item.first_name || '',
        tipoff_number: item.tipoff_number || '',
        middle_name: item.middle_name || '',
        surname: item.surname || '',
        primary_email: item.primary_email || '',
        primary_phone: item.primary_phone || '',
        primary_postal: item.primary_postal || '',
        gender: item.gender || '',
        nationality: item.nationality || '',
        breach_nature: item.breach_nature || '',
        breach_description: item.breach_description || '',
        breach_location: item.breach_location || '',
        breach_date: item.breach_date || '',
        profile_data_consent: item.profile_data_consent || false,
        service_id: item.service_id || '',
        service_name: item.service_name || '',
        service_version: item.service_version || ''
    }));
};

export const TipOffsTable: React.FC<WorkProps> = ({status, userRole}) => {
    const { inv_Next_Status } = roleObjects[userRole] || {};
    const [response, setResponse] = useState<TipOff[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function getTipOffsList(status: string) {
        setIsLoading(true);
        setError(null);
        
        try {
            const result = await getTipOffs("Incoming", 100);
            
            if (result.data && Array.isArray(result.data)) {
                // Process the data safely
                const processedData = processApiResponse(result.data);
                setResponse(processedData);
            } else {
                console.warn('Invalid or empty data received from API');
                setResponse(null);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            console.error('Error fetching tipoffs:', errorMessage);
            setError(errorMessage);
            setResponse(null);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getTipOffsList(status || '');
    }, [status]);

    if (error) {
        return (
            <div className="p-4 text-red-500">
                Error loading tipoffs: {error}
            </div>
        );
    }

    return (
        <div className="h-full">
            {isLoading ? (
                <TableLoadingSkeleton rows={6} columns={6} className="mt-4" />
            ) : response ? (
                <DataTable data={response} columns={tipoffsColumns} userRole={userRole} />
            ) : (
                <DataTable data={[]} columns={tipoffsColumns} userRole={userRole} />
            )}
        </div>
    )
}

export default TipOffsTable;