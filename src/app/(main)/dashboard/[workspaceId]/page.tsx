export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";

import QuillEditor from "@/components/quill-editor/quill-editor";
import { getWorkspaceDetails } from "@/lib/supabase/queries";

const Workspace = async ({ params }: { params: { workspaceId: string } }) => {
  const { data, error } = await getWorkspaceDetails(params.workspaceId);

  if (error || !data.length) redirect("/dashboard");
  return (
    <div className="relative">
      <QuillEditor
        dirType="workspace"
        fileId={params.workspaceId}
        dirDetails={data[0] || {}}
      />
    </div>
  );
};

export default Workspace;
