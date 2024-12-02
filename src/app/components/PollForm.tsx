import { Program } from "@coral-xyz/anchor";
import { Votee } from "@project/anchor";

type FormProps = {
    formData: {
      description: string;
      startDate: string;
      endDate: string;
    };
    setFormData: (data: any) => void;
    program: Program<Votee> | null;
    isInitialized: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  };

function Form({ formData, setFormData, program, isInitialized, handleSubmit }: FormProps) {
    return(
      <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2 ">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700"
              >
                Poll Description
              </label>
              <input
                type="text"
                id="description"
                placeholder="Briefly describe the purpose of this poll..."
                required
                className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
  
            <div className="pt-4">
              <label
                htmlFor="startDate"
                className="block text-sm font-semibold text-gray-700 pb-2"
              >
                Start Date
              </label>
              <input
                type="datetime-local"
                id="startDate"
                required
                className="block h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
  
            <div className="pt-4">
              <label
                htmlFor="endDate"
                className="block text-sm font-semibold text-gray-700 pb-2"
              >
                End Date
              </label>
              <input
                type="datetime-local"
                id="endDate"
                required
                className="block h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
  
            <div className="flex justify-center w-full">
              <button
                type="submit"
                disabled={!program || !isInitialized}
                className=" border-2 text-white border-blue-300 hover:border-blue-400 hover:ring-offset-2 hover:shadow-blue-500/50 hover:ring-2 p-2 rounded-lg text-2xl font-bold bg-gradient-to-br from-purple-300 via-blue-400 to-purple-300"
              >
                Create Poll
              </button>
            </div>
          </form>
    )
  }

  export default Form;