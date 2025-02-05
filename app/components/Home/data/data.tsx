import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
  } from "@radix-ui/react-icons"
  
  export const labels = [
    {
      value: "Bar",
      label: "Bar",
    },
    {
      value: "Investigate",
      label: "Investigate",
    },
    {
      value: "Approve",
      label: "Approve",
    },
  ]
  export const endorse_status = [
    {
      value: "Pending-Endorsement",
      label: "Pending-Endorsement",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "Endorsement-Recommendation",
      label: "Endorsement-Recommendation",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "Endorsement-Complete",
      label: "Endorsement-Complete",
      icon: CheckCircledIcon,
    },
  ]
  export const final_status = [
    {
      value: "Manager-Rejected",
      label: "Manager-Rejected",
      icon: CrossCircledIcon,
    },
    {
      value: "Manager-Approved",
      label: "Manager-Approved",
      icon: CheckCircledIcon,
    },
    {
      value: "Senior-RO-Rejected",
      label: "Senior-RO-Rejected",
      icon: CrossCircledIcon,
    },
  ]
  export const statuses = [
    {
      value: "Manager-Rejected",
      label: "Manager-Rejected",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "Manager-Approved",
      label: "Manager-Approved",
      icon: CheckCircledIcon,
    },
    {
      value: "Recommended-For-Rejection",
      label: "Recommended-For-Rejection",
      icon: CrossCircledIcon,
    },
    {
      value: "Recommended-For-Approval",
      label: "Recommended-For-Approval",
      icon: CheckCircledIcon,
    },
    {
      value: "Pending-Review",
      label: "Pending-Review",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "Pending-Screening",
      label: "Pending-Screening",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "Pending-Assessment",
      label: "Pending-Assessment",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "Pending-Manager-Review",
      label: "Pending-Manager-Review",
      icon: CheckCircledIcon,
    },
    {
      value: "Pending-Director-Review",
      label: "Pending-Director-Review",
      icon: QuestionMarkCircledIcon,
    },
  ]

  export const invstatuses = [
    {
      value: "INCOMING",
      label: "Incoming",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "UNDER-REVIEW",
      label: "Under-Review",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "ASSESSMENT",
      label: "Assessment",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "ONGOING-INVESTIGATION",
      label: "Ongoing-investigation",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "RECOMMEND-FOR-CLOSURE",
      label: "Recommend for closure",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "RECOMMEND-FOR-INVESTIGATION",
      label: "Recommend for RE-Investigation",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "RECOMMEND-FOR-DISCIPLINARY",
      label: "Recommend for Disciplinary",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "CASE-CLOSED",
      label: "Case Closed",
      icon: CheckCircledIcon,
    },
    {
      value: "EXTERNAL-INVESTIGATION",
      label: "External Investigation",
      icon: CrossCircledIcon,
    },
    {
      value: "RECOMMEND-FOR-EXTERNAL-INVESTIGATION",
      label: "Recommend for External Investigation",
      icon: CheckCircledIcon,
    }
  ]
  
  export const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDownIcon,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRightIcon,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUpIcon,
    },
  ]

  export const endorsement_status = [
    {
      label: 'Pending-Endorsement',
      value: 'Pending-Endorsement',
      icon: QuestionMarkCircledIcon
    },
    {
      label: 'Endorsement-Recommendation',
      value: 'Endorsement-Recommendation',
      icon: StopwatchIcon
    },
    {
      label: 'Endorsement-Complete',
      value: 'Endorsement-Complete',
      icon: CheckCircledIcon
    }
  ]  