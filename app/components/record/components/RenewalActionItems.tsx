'use client'

import React, { useState } from 'react'
import { Edit, FileText, Save, Send, UserPlus2, SendIcon, PlusCircle, FileCheck2, ChevronDownIcon, X, AlertTriangle, InfoIcon, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateRenewalStatus } from '@/app/lib/actions'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/components/ui/use-toast'
import { Role, getFlowActionUserDetails } from '@/app/lib/store'
import ActivityModal from '../ActivityModal'
import { getAuthData } from '@/app/welcome/components/email-login'

interface ActionButtonsProps {
  recordId: string;
  userRole: Role;
  current_status: string;
}

interface FlowActionConfig {
  hasPermission: boolean;
  nextStatus: string[] | undefined;
  message?: string;
  status_label: string;
  isAllowedRole: boolean;
}

type DialogType = 'actions' | 'report' | 'status' | 'submit' | 'activity' | null;

const RenewalActionButtons: React.FC<ActionButtonsProps> = ({ recordId, userRole, current_status }) => {
  const [activeDialog, setActiveDialog] = useState<DialogType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [formData, setFormData] = useState({
    investigation_details: '',
    investigation_outcome: ''
  });
  // const [bearer, setBearer] = useState('');
  
  const router = useRouter();
  const { toast } = useToast();
  
  // Get flow-action configuration
  const accessConfig: FlowActionConfig = getFlowActionUserDetails(userRole, current_status,'renewal') || {
    hasPermission: false,
    nextStatus: [],
    message: '',
    status_label: '',
    isAllowedRole: false
  };

  const { hasPermission, nextStatus, status_label, isAllowedRole } = accessConfig;

  const hasSingleStatus = Array.isArray(nextStatus) && nextStatus.length === 1;
  const hasMultipleStatuses = Array.isArray(nextStatus) && nextStatus.length > 1;
  const availableStatuses = nextStatus || [];

  // Helper functions
  const closeDialog = () => {
    setActiveDialog(null);
    setError('');
    setSelectedStatus('');
  };

  const showError = (message: string) => {
    setError(message);
    toast({
      title: "Error",
      description: message,
      variant: "destructive"
    });
  };


  const handleStatusUpdate = async (status: string) => {
    setIsSubmitting(true);
    try {
      const authData = getAuthData();
      const bearerToken = authData?.access_token;
      const result = await updateRenewalStatus(recordId, status, bearerToken);
      if (result.code === 200 || result.code === 201 || result.code === 500 || result.code === 504) {
        closeDialog();
        toast({
          title: "Success",
          description: `Status updated to: ${status}`
        });
        router.push('/trls/work')
      } else {
        closeDialog();
        toast({
          title: "Success",
          description: `Status updated to: ${status}`
        });
        router.push('/trls/work')
        // showError(result.message || 'Failed to update status');
      }
    } catch (error) {
      showError('Failed to update status');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render action button
  const renderActionButton = (
    icon: React.ElementType,
    label: string,
    onClick: () => void,
    colorClass: string
  ) => {
    const Icon = icon;
    return (
      <Button 
        variant="ghost" 
        className="w-full justify-start hover:bg-gray-100 rounded-lg px-4 py-2.5 transition-colors"
        onClick={onClick}
      >
        <div className="flex items-center">
          <div className={`h-8 w-8 rounded-full bg-${colorClass}-100 flex items-center justify-center mr-3`}>
            <Icon className={`w-4 h-4 text-${colorClass}-600`} />
          </div>
          <span className="font-medium">{label}</span>
        </div>
      </Button>
    );
  };

  // Render submit dialog content based on status count
  const renderSubmitContent = () => {
    if (hasSingleStatus && availableStatuses[0]) {
      return (
        <AlertDialogContent className="sm:max-w-[500px]">
          <AlertDialogHeader>
            <AlertDialogTitle>{status_label}</AlertDialogTitle>
            <AlertDialogDescription>
              This action will update the status to <span className="font-medium text-green-600">{availableStatuses[0]}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && (
            <div className="p-4 rounded-md bg-red-50">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <p className="ml-3 text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
            <Button
              className="bg-blue-700 hover:bg-blue-800"
              onClick={() => handleStatusUpdate(availableStatuses[0])}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit
                </>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      );
    }

    return (
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{status_label}</DialogTitle>
          <DialogDescription>Select the next step for this record</DialogDescription>
        </DialogHeader>
        {error && (
          <div className="p-4 rounded-md bg-red-50">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <p className="ml-3 text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Allocate</Label>
            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select next step" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {availableStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.replace(/-/g, ' ').toLocaleLowerCase()}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              onClick={() => handleStatusUpdate(selectedStatus)}
              disabled={isSubmitting || !selectedStatus}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    );
  };

  return (
    <>
      <Button 
        onClick={() => setActiveDialog('actions')}
        className="bg-blue-500 hover:bg-blue-600 text-white flex items-center space-x-2"
      >
        <span>Actions</span>
        <ChevronDownIcon className="h-4 w-4" />
      </Button>

      {/* Actions Dialog */}
      <Dialog open={activeDialog === 'actions'} onOpenChange={() => closeDialog()}>
        <DialogContent className="sm:max-w-[350px] p-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b bg-gray-50">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Actions
            </DialogTitle>
          </DialogHeader>
          <div className="px-2 py-3">
            <div className="space-y-1">
              {hasPermission && availableStatuses.length > 0 && (
                renderActionButton(
                  hasSingleStatus ? Send : UserPlus2,
                  status_label,
                  () => setActiveDialog('submit'),
                  'blue'
                )
              )}
              
              {/* { renderActionButton(
                PlusCircle,
                'Add Activity',
                () => setActiveDialog('activity'),
                'green'
              )} */}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Status Update Dialog */}
      {activeDialog === 'submit' && (
        hasSingleStatus ? (
          <AlertDialog open={true} onOpenChange={() => closeDialog()}>
            {renderSubmitContent()}
          </AlertDialog>
        ) : (
          <Dialog open={true} onOpenChange={() => closeDialog()}>
            {renderSubmitContent()}
          </Dialog>
        )
      )}

      {/* Activity Modal */}
      {activeDialog === 'activity' && (
        <ActivityModal 
          onClose={() => closeDialog()} 
          recordId={recordId}
        />
      )}
    </>
  );
};

export default  RenewalActionButtons;