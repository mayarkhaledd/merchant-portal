import {
  EmailTemplate,
  GetEmailTemplatePayload,
} from "@ejada/types/api/emailInterface";

export interface TEmailTemplateState {
  // Template management
  templates: EmailTemplate[];
  editingTemplate: EmailTemplate | null;
  //selectedTemplate: EmailTemplate | null;

  // UI states
  isLoading: boolean;
  isBuilderOpen: boolean;

  // Operation loading states
  isCreatingTemplate: boolean;
  isUpdatingTemplate: boolean;
  isDeletingTemplate: boolean;
  isTogglingStatus: boolean;

  // Form states
  templateName: string;
  initialTemplate: string; //html
  selectedTemplateDocument: any;
  selectedRawJson: any;

  // Search and filter
  searchQuery: Partial<GetEmailTemplatePayload>;
  activeSearchCriteria: Partial<GetEmailTemplatePayload>;
  // Success states
  // isCreateSuccess: boolean;
  // isUpdateSuccess: boolean;
  // isDeleteSuccess: boolean;
  // isToggleSuccess: boolean;

  // // Error states
  // isCreateError: boolean;
  // isUpdateError: boolean;
  // isDeleteError: boolean;
  // isToggleError: boolean;

  // // Error messages
  // createErrorMessage?: string;
  // updateErrorMessage?: string;
  // deleteErrorMessage?: string;
  // toggleErrorMessage?: string;
}

// export interface EmailBuilderProps {
//   // Optional initial state
//   initialTemplates?: EmailTemplate[];

//   // Event handlers
//   onTemplateCreate?: (template: EmailTemplate) => void;
//   onTemplateUpdate?: (template: EmailTemplate) => void;
//   onTemplateDelete?: (templateId: number) => void;
//   onTemplateSelect?: (template: EmailTemplate) => void;

//   // Configuration
//   enableCreate?: boolean;
//   enableEdit?: boolean;
//   enableDelete?: boolean;
//   enablePreview?: boolean;
//   enableToggleStatus?: boolean;

//   // UI customization
//   showHeader?: boolean;
//   headerTitle?: string;
//   headerDescription?: string;
//   emptyStateMessage?: string;

//   // Grid configuration
//   gridColumns?: 'auto' | 1 | 2 | 3 | 4 | 5 | 6;

//   // Modal configuration
//   modalWidth?: string;
//   modalHeight?: string;
// }

// export interface TemplateCardProps {
//   template: EmailTemplate;
//   onEdit: (template: EmailTemplate) => void;
//   onDelete: (templateId: number) => void;
//   onPreview: (template: EmailTemplate) => void;
//   onToggleStatus?: (templateId: number, currentStatus: string) => void;

//   // Loading states
//   isUpdating?: boolean;
//   isDeleting?: boolean;
//   isToggling?: boolean;

//   // Configuration
//   enableEdit?: boolean;
//   enableDelete?: boolean;
//   enablePreview?: boolean;
//   enableToggleStatus?: boolean;
// }

// export interface TemplateActionButtonsProps {
//   template: EmailTemplate;
//   onEdit: (template: EmailTemplate) => void;
//   onDelete: (templateId: number) => void;
//   onPreview: (template: EmailTemplate) => void;
//   onToggleStatus?: (templateId: number, currentStatus: string) => void;

//   // Loading states
//   isUpdating?: boolean;
//   isDeleting?: boolean;
//   isToggling?: boolean;

//   // Button configuration
//   showEditButton?: boolean;
//   showDeleteButton?: boolean;
//   showPreviewButton?: boolean;
//   showToggleButton?: boolean;

//   // Button styles
//   buttonSize?: 'small' | 'medium' | 'large';
//   buttonVariant?: 'overlay' | 'inline';
// }

// export interface TemplateSearchProps {
//   searchQuery: Partial<GetEmailTemplatePayload>;
//   onSearch: (query: Partial<GetEmailTemplatePayload>) => void;
//   onClearSearch: () => void;

//   // Available filters
//   enableNameFilter?: boolean;
//   enableStatusFilter?: boolean;
//   enableLanguageFilter?: boolean;
//   enableDateFilter?: boolean;

//   // Filter options
//   statusOptions?: Array<{ label: string; value: string }>;
//   languageOptions?: Array<{ label: string; value: string }>;
// }

// export interface ThumbnailGeneratorConfig {
//   width: number;
//   height: number;
//   scale: number;
//   quality: number;
//   backgroundColor: string;
//   fallbackIcon: string;
//   fallbackText: string;
// }

// export interface EmailBuilderModalConfig {
//   width: string;
//   height: string;
//   enableNameField: boolean;
//   enableTemplateValidation: boolean;
//   autoSave: boolean;
//   autoSaveInterval: number;
// }

// // Hook return type
// export interface UseEmailBuilderReturn {
//   // Data
//   templates: EmailTemplate[];
//   editingTemplate: EmailTemplate | null;
//   emailTemplateByIdData: EmailTemplate | null;

//   // UI States
//   isLoading: boolean;

//   // Loading states for operations
//   isCreatingTemplate: boolean;
//   isUpdatingTemplate: boolean;
//   isDeletingTemplate: boolean;
//   isTogglingStatus: boolean;

//   // Success states
//   isCreateEmailTemplateSuccess: boolean;
//   isUpdateEmailTemplateSuccess: boolean;
//   isDeleteEmailTemplateSuccess: boolean;
//   isToggleEmailTemplateStatusSuccess: boolean;

//   // Error states
//   isCreateEmailTemplateError: boolean;
//   isUpdateEmailTemplateError: boolean;
//   isDeleteEmailTemplateError: boolean;
//   isToggleEmailTemplateStatusError: boolean;
//   createEmailTemplateAxiosError: any;
//   updateEmailTemplateAxiosError: any;
//   deleteEmailTemplateAxiosError: any;
//   toggleEmailTemplateStatusAxiosError: any;
//   emailTemplateByIdDataError: boolean;
//   emailTemplateByIdDataAxiosError: any;

//   // API Methods
//   createEmailTemplate: (templateData: {
//     name: string;
//     html: string;
//     documentData: any;
//     thumbnail?: string;
//   }) => Promise<void>;
//   updateEmailTemplate: (templateId: number, templateData: {
//     name: string;
//     html: string;
//     documentData: any;
//     thumbnail?: string;
//   }) => Promise<void>;
//   deleteEmailTemplate: (templateId: number) => Promise<void>;
//   toggleEmailTemplateStatus: (templateId: number, currentStatus: string) => Promise<void>;
//   getEmailTemplateById: (templateId: number) => Promise<EmailTemplate | null>;

//   // Helper methods
//   handleEditTemplate: (template: EmailTemplate) => void;
//   clearEditingTemplate: () => void;

//   // Search functionality
//   searchQuery: Partial<GetEmailTemplatePayload>;
//   handleSearch: (searchCriteria: Partial<GetEmailTemplatePayload>) => void;
//   clearSearch: () => void;

//   // Refetch methods
//   refetchEmailTemplates: () => void;
//   refetchEmailTemplateByIdData: () => void;
// }
