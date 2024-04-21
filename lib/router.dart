import 'package:elitemarketv2/features/home/screens/home_screen.dart';
import 'package:flutter/material.dart';

Route<dynamic> genrateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    case HomeScreen.routeName:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const HomeScreen());
    default:
      return MaterialPageRoute(
          settings: routeSettings, builder: (_) => const Scaffold(
            body: Center(
              child: Text("Screen does not exist"),
            ),
          ));
  }
}
