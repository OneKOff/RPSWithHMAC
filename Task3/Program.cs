using System;
using System.Linq;
using System.Text;
using System.Security.Cryptography;

public class Program {
    string[] args;    
    RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
    byte[] key = new byte[16];
    HMACSHA256 hmac;
    byte[] hash;
    int compId;

    public static void Main(string[] args) {
        Program program = new Program();
        program.args = args;
        if (!program.ArgumentsValid()) return;
        program.StartGame();
    }

    public bool ArgumentsValid() {
        if (args.Length < 3 || args.Length % 2 == 0 || !args.SequenceEqual(args.Distinct().ToArray())) {
            Console.WriteLine("Error: An odd amount of arguments greater than 2 " + 
            "and with no duplicates required. \nExample: rock paper scizzors");
            return false;
        }
        return true;
    }
    public void StartGame() {
        while (true) {
            GenerateKey();
            GenerateTurn();
            if (!GameData()) break;
        }
    }
    public void GenerateKey() {
        rng.GetBytes(key);
        byte[] compMove = new byte[4]; rng.GetBytes(compMove);
        compId = BitConverter.ToUInt16(compMove) % args.Length;
    }
    public void GenerateTurn() {
        hmac = new HMACSHA256(key);
        byte[] moveName = Encoding.Default.GetBytes(args[compId]);
        Console.WriteLine(BitConverter.ToString(moveName));
        hash = hmac.ComputeHash(moveName);
    }
    public bool GameData() {
        PrintMenu();
        return CheckInput(Input());
    }
    public void PrintMenu() {
        Console.Write("\nHMAC: "); Console.WriteLine(BitConverter.ToString(hash).Replace("-", ""));
        Console.WriteLine("Available moves:"); for (int i = 0; i < args.Length; i++) Console.WriteLine((i + 1) + " - " + args[i]);
        Console.WriteLine("0 - Exit");
    }
    public int Input() {
        int playerId;
        string input = Console.ReadLine();
        try { playerId = Convert.ToInt32(input); } catch { playerId = -1; }
        return playerId;
    }
    public bool CheckInput(int playerId) {
        if (playerId == 0) return false;
        if (playerId < 0 || playerId > args.Length) return true; 
        PrintGameResult(playerId);
        return true;
    }
    public void PrintGameResult(int playerId) {
        Console.WriteLine("Your move: " + args[--playerId] + "\nComputer move: " + args[compId]);
        PrintWinner(playerId);
        Console.Write("HMAC key: "); Console.WriteLine(BitConverter.ToString(key).Replace("-", ""));
    }
    public void PrintWinner(int playerId) {
        if (playerId == compId) Console.WriteLine("Draw!");
        else if (PlayerWon(playerId)) Console.WriteLine("You win!");
        else Console.WriteLine("You lose!");
    }
    public bool PlayerWon(int playerId) {
        int range = args.Length / 2;
        if (playerId >= range && compId >= playerId - range && compId < playerId ||
           (playerId < range && compId >= playerId - range + args.Length) || compId < playerId) return true; 
        return false;
    }
}