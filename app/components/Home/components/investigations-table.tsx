"use client"
import { DataTable } from "./data-table";
import {  getInvRecords } from "@/app/lib/actions"
import React, { useEffect, useState } from "react"
import TableLoadingSkeleton from "../../TableLoadingSkeleton";
import { investigationsColumns } from "./investigations-columns";
import { roleObjects } from "@/app/lib/store";

interface WorkProps {
    status: string;
    userRole: string;
}

interface Complaint {
    Omang_id: string;
    submission_type: string;
    reg_status: string;
    date_of_submission: string;
    anonymous: boolean;
    case_number: string;
    inquiry_number: string;
}

// Utility function to replace null with empty string recursively
const replaceNullWithEmptyString = <T extends object>(obj: T): T => {
    const replacer = (key: string, value: any): any => {
        // If value is null, return empty string
        if (value === null) return '';
        
        // If value is an array, recursively process each element
        if (Array.isArray(value)) {
            return value.map(item => 
                typeof item === 'object' ? replaceNullWithEmptyString(item) : (item ?? '')
            );
        }
        
        // If value is an object, recursively process it
        if (typeof value === 'object') {
            return replaceNullWithEmptyString(value);
        }
        
        // Return the value as is if it's not null, undefined, object, or array
        return value ?? '';
    };

    return JSON.parse(JSON.stringify(obj), replacer);
};

export const InvestigationsTable: React.FC<WorkProps> = ({status, userRole}) => {
    // const { inv_Next_Status} = roleObjects[userRole.toUpperCase()] || {};
    const [response, setResponse] = useState<Complaint[] | null>(null)
    const [isLoading, setIsLoading] = useState(false);
  
    async function getApplications(status: string) {
        setIsLoading(true);
        try {
            const list: Complaint[] = await getInvRecords(status, '100');
            setResponse(list);
        } catch (error) {
            setResponse(null);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getApplications(status || '');
    }, [status]);

    return (
        <div className="h-full">
            {isLoading ? (
                <TableLoadingSkeleton rows={6} columns={5} className="mt-4" />
            ) : response ? (
                <DataTable data={response} columns={investigationsColumns} userRole={userRole} />
            ) : (
                <DataTable data={[]} columns={investigationsColumns} userRole={userRole} />
            )}
        </div>
    )
} 